import React, { useState } from "react";
import { Card, Pagination, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "../../../../configs/api.js";
import { Link } from "react-router-dom";

const HomePages = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const currentStories =
    data?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <div className="text-3xl font-sans mb-4">
        <h1>Danh sách truyện</h1>
      </div>
      <div className="grid grid-cols-4 gap-x-8 gap-y-8 m-3">
        {currentStories.map((story) => (
          <Card
            key={story._id}
            hoverable
            style={{ width: "100%" }}
            cover={
              <img
                alt={story.name}
                src={`https://otruyenapi.com/uploads/comics/${story.thumb_url}`}
              />
            }
          >
            <Meta
              title={
                <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                  {story.name}
                </div>
              }
              description={<div className="text-green-500">{story.status}</div>}
            />
            <p className="mt-3">{story.updatedAt}</p>
            <div className="mt-3 bg-slate-800 text-white hover:bg-white hover:text-slate-800 py-2 text-center rounded-2xl">
              <Link to={`/detail/${story.slug}`}>More Detail</Link>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data?.length || 0}
          onChange={onChangePage}
        />
      </div>
    </div>
  );
};

export default HomePages;
