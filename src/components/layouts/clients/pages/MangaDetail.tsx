import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spin, Modal } from "antd";
import { getBySlug, getChapterDetails } from "../../../../configs/api";

const MangaDetail = () => {
  const { slug } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChapterImages, setSelectedChapterImages] = useState([]);
  const [isChapterLoading, setIsChapterLoading] = useState(false);

  // Get the story data
  const { data, isLoading, error } = useQuery({
    queryKey: ["truyen-tranh", slug],
    queryFn: () => getBySlug(slug),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  if (error instanceof Error) return <div>Error: {error.message}</div>;
  // Access the story data
  const { item: story } = data || {};
  const { chapters } = story || {};

  // Function to handle chapter click
  const handleChapterClick = async (chapterApiData) => {
    try {
      setIsChapterLoading(true);
      const chapterDetails = await getChapterDetails(chapterApiData);
      // Extract chapter images
      const images = chapterDetails?.item?.chapter_image?.map((img) => {
        const url = `${chapterDetails.domain_cdn}/${chapterDetails.item.chapter_path}/${img.image_file}`;
        console.log("Generated Image URL:", url);
        return url;
      });

      if (images && images.length > 0) {
        setSelectedChapterImages(images);
      } else {
        console.warn("No images found in chapter details");
        setSelectedChapterImages([]);
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching chapter details:", error);
    } finally {
      setIsChapterLoading(false);
    }
  };

  // Function to handle read from start
  const handleReadFromStart = () => {
    const firstChapter = chapters?.[0]?.server_data[0]?.chapter_api_data;
    if (firstChapter) {
      handleChapterClick(firstChapter);
    }
  };
  // Function to handle read latest
  const handleReadLatest = () => {
    const allChapters = chapters?.flatMap((server) => server.server_data) || [];
    const sortedChapters = allChapters.sort((a, b) => {
      // Sắp xếp dựa vào chapter_name (hoặc trường khác có thể đại diện cho thứ tự chương)
      const numA = parseInt(a.chapter_name);
      const numB = parseInt(b.chapter_name);
      return numB - numA; // Sắp xếp giảm dần
    });

    const latestChapter = sortedChapters?.[0]?.chapter_api_data;
    if (latestChapter) {
      handleChapterClick(latestChapter);
    } else {
      console.warn("Không tìm thấy chapter mới nhất.");
    }
  };


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Story details */}
        <div className="w-full md:w-2/3 pr-6">
          <div className="flex justify-center mb-6">
            <img
              src={`https://otruyenapi.com/uploads/comics/${story?.thumb_url}`}
              alt={story?.name}
              className="rounded-lg shadow-md w-64 h-96 object-cover"
            />
          </div>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-4">{story?.name}</h1>
            <div
              className="text-gray-800 mb-4"
              dangerouslySetInnerHTML={{ __html: story?.content }}
            />
            <p className="text-gray-800 font-semibold">
              Trạng thái: {story?.status}
            </p>
          </div>
          {/* Read buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              className="bg-slate-800 text-white hover:bg-white hover:text-black p-2 rounded"
              onClick={handleReadFromStart}
            >
              Đọc từ đầu
            </button>
            <button
              className="bg-slate-800 text-white hover:bg-white hover:text-black p-2 rounded"
              onClick={handleReadLatest}
            >
              Đọc mới nhất
            </button>
          </div>
        </div>

        {/* Chapter list */}
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Danh sách chapter</h2>
          <div className="max-h-96 overflow-y-auto">
            <ul className="list-none">
              {chapters
                ?.flatMap((server) => server.server_data)
                ?.map((chapter, index) => (
                  <li key={index} className="mb-4">
                    <button
                      className="text-black hover:text-blue-800 hover:underline transition-all duration-200"
                      onClick={() =>
                        handleChapterClick(chapter.chapter_api_data)
                      }
                    >
                      {`Chapter ${index + 1}`}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Chapter modal */}
      <Modal
        title="Chi tiết chương"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {isChapterLoading ? (
          <p>Đang tải hình ảnh...</p>
        ) : selectedChapterImages.length === 0 ? (
          <p>Không tìm thấy hình ảnh cho chương này. Vui lòng thử lại sau.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {selectedChapterImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Page ${index + 1}`}
                className="rounded shadow-md mx-auto"
              />
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MangaDetail;
