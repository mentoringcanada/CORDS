import { useRouter } from "next/router";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
	pageCount: number;
	page: number;
}

const Pagination = ({ pageCount, page }: Props) => {
	const router = useRouter();

	const onPageChange = (page: number) => {
		if (page > pageCount || page <= 0) return;
		router.push({
			query: { ...router.query, page },
		});
	};

	return (
		<div className="flex items-center mt-10 text-xs">
			{page !== 1 && (
				<button
					onClick={() => onPageChange(page - 1)}
					className="btn btn-ghost mr-2"
					aria-label="visit previous page"
				>
					<FaAngleLeft className="h-4" />
				</button>
			)}
			{page > 1 && (
				<button
					onClick={() => onPageChange(page - 1)}
					className="btn btn-ghost mr-2"
					aria-label="previous page"
				>
					{page - 1}
				</button>
			)}
			<button aria-label="current page" className="btn btn-primary mr-2">
				{page}
			</button>
			{page < pageCount && (
				<>
					<button
						onClick={() => onPageChange(page + 1)}
						className="btn btn-ghost mr-2"
						aria-label="next page"
					>
						{page + 1}
					</button>
					<button
						onClick={() => onPageChange(page + 1)}
						aria-label="visit next page"
						className="btn btn-ghost"
					>
						<FaAngleRight className="h-4" />
					</button>
				</>
			)}
		</div>
	);
};

export default Pagination;
