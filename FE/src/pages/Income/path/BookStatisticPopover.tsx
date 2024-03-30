import React, { useEffect, useState } from "react";
import statisticService from "../../../services/statisticService";
import { IBookStatisticDetails } from "../../../type/static.type";

const BookStatisticPopover = ({ id }: { id: string }) => {
	const [memberList, setMemberList] =
		useState<IBookStatisticDetails | null>(null);
	useEffect(() => {
		setMemberList(null);
		if (id) {
			statisticService.read({ id }).then((res) => {
				setMemberList(res.data as IBookStatisticDetails);
			});
		}

		console.log(id);
	}, [id]);
	return (
		<div>
			<div className="divide-y-2">
				{memberList && (
					<>
						{memberList.members.map((n) => (
							<div key={n.id} className="p-2">
								<div className="flex items-center gap-2">
									<div>Member: </div>
									<div>{n.name} </div>
								</div>
								<div className="flex items-center gap-2">
									<div>Address: </div>
									<div>{n.address} </div>
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default BookStatisticPopover;
