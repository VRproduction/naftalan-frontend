import React from "react";

interface Props {
  data: string;
}

const ContraindicationsPage: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div
            dangerouslySetInnerHTML={{ __html: data }}
            className="custom-html-content text-gray-700"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ContraindicationsPage;
