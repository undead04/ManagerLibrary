import React, { useEffect, useState } from "react";
import { IMemberStatisticDetails } from "../../../type/static.type";
import statisticService from "../../../services/statisticService";
import { formatCurrency } from "../../../utils/formatCurrency";
import formatDate from "../../../utils/formatDate";
import { Link } from "react-router-dom";

const MemberStatisticPopover = ({ id }: { id: string }) => {
	const [memberList, setMemberList] =
		useState<IMemberStatisticDetails | null>(null);
	useEffect(() => {
		setMemberList(null);
		if (id) {
			statisticService.memberRead({ id }).then((res) => {
				setMemberList(res.data as IMemberStatisticDetails);
			});
		}

		console.log(id);
	}, [id]);
	return (
		<div>
			<div className="divide-y-2">
				{memberList && (
					<>
						{memberList.bookTranstionDetail.map((n) => (
							<div key={n.id} className="p-2">
								<div className="flex items-center gap-2">
									<div>Title: </div>
									<Link to={`/book/d/${n.bookId}`}>
										{n.nameBook}{" "}
									</Link>
								</div>
								<div className="flex items-center gap-2">
									<div>Price: </div>
									<div>{formatCurrency(parseFloat(n.price))} </div>
								</div>
								<div className="flex items-center gap-2">
									<div>Deadline: </div>
									<div>{formatDate(n.deadLineDate)} </div>
								</div>
								<div className="flex items-center gap-2">
									<div>Status: </div>
									<div
										className={`px-2 py-1 rounded-lg text-white ${
											n.status === "Quá hạn"
												? "bg-red-600"
												: "bg-blue-600"
										}`}
									>
										{n.status}
									</div>
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default MemberStatisticPopover;
