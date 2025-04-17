/* eslint-disable no-unused-vars */
import React from 'react';
import ReactMarkdown from 'react-markdown';

const ProductDescription = ({ description }) => {
	if (!description)
		return <div className="text-gray-500 italic">Chưa có mô tả</div>;

	return (
		<div className="text-gray-800 text-base leading-relaxed">
			<ReactMarkdown
				components={{
					// Giữ nguyên các cấu hình components
					h1: ({ node, ...props }) => (
						<h1
							className="text-2xl font-bold mt-6 mb-4"
							{...props}
						/>
					),
					h2: ({ node, ...props }) => (
						<h2
							className="text-xl font-bold mt-5 mb-3"
							{...props}
						/>
					),
					h3: ({ node, ...props }) => (
						<h3
							className="text-lg font-bold mt-4 mb-2"
							{...props}
						/>
					),
					p: ({ node, ...props }) => (
						<p className="mb-4" {...props} />
					),
					ul: ({ node, ...props }) => (
						<ul className="list-disc ml-6 mb-4" {...props} />
					),
					ol: ({ node, ...props }) => (
						<ol className="list-decimal ml-6 mb-4" {...props} />
					),
					li: ({ node, ...props }) => (
						<li className="mb-2" {...props} />
					),
					a: ({ node, ...props }) => (
						<a
							className="text-indigo-600 hover:underline"
							{...props}
						/>
					),
				}}
			>
				{description}
			</ReactMarkdown>
		</div>
	);
};

export default ProductDescription;
