import React, { useEffect, useState } from "react";
import { Table, Descriptions, Divider, Image, Tag, Popover } from "antd";
import type { TableColumnsType } from "antd";
import { Link, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../context/store";
import { getBorrowBooks } from "../../context/BorrowBook/borrowBook.slice";
import { IBorrowBookEntity } from "../../type";
import { useSelector } from "react-redux";
import { getGuest } from "../../context/Guest/guest.slice";
import IGuest from "../../type/guest.type";
import NoReturnBookPopover from "../Library/NoReturnBookPopover";
import { EyeOutlined } from "@ant-design/icons";

interface BorrowBookExtend extends IBorrowBookEntity {
  key: React.Key;
  index: number;
}

const GuessDetail = () => {
  const dispatch = useAppDispatch();
  const [currentGuest, setCurrentGuest] = useState<IGuest | null>(null);
  const { id } = useParams();
  const borrowBooks = useSelector(
    (state: RootState) => state.borrowBook.borrowBooks
  );

  const isLoading = useSelector((state: RootState) => state.guest.isLoading);
  const filteredData: BorrowBookExtend[] = borrowBooks.map((g, index) => {
    return {
      ...g,
      key: g.id,
      index: index + 1,
    };
  });
  const columns: TableColumnsType<BorrowBookExtend> = [
    {
      title: "#",
      dataIndex: "index",
    },
    {
      title: "Type",
      dataIndex: "ballotType",
      render: (type: string) => {
        return (
          <>
            <Tag color={type === "X" ? "error" : "success"}>
              {type === "X" ? "Lending" : "Getting"}
            </Tag>
          </>
        );
      },
      filters: [
        {
          text: "Lending",
          value: "X",
        },
        {
          text: "Getting",
          value: "N",
        },
      ],
      onFilter: (value: boolean | React.Key, record) => {
        return record.ballotType === value;
      },
    },

    {
      title: "Staff",
      dataIndex: "nameStaff",
      sorter: (a, b) => a.nameMember.localeCompare(b.nameMember),
    },
    {
      title: "State",
      dataIndex: "id",
      render: (id: string, item) => (
        <Popover
          placement="top"
          title={"Details"}
          content={<NoReturnBookPopover id={id} />}
        >
          <Link
            to={`/library/coupon/${id}/memberId/${item.memebrId}`}
            type="primary"
            className="flex items-center p-2"
          >
            <EyeOutlined />
          </Link>
        </Popover>
      ),
    },
  ];
  useEffect(() => {
    if (id) {
      dispatch(getBorrowBooks({ memberId: id }));
      dispatch(getGuest(id))
        .unwrap()
        .then((res) => {
          setCurrentGuest(res as IGuest);
        });
    }
  }, []);

  return (
    <div>
      <div>
        {currentGuest && (
          <Descriptions title="Guest Info">
            <Descriptions.Item label="Avatar">
              <Image width={200} src={currentGuest.urlImage} />
            </Descriptions.Item>
            <Descriptions.Item label="Username">
              {currentGuest?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Phone number">
              {currentGuest?.phone}
            </Descriptions.Item>

            <Descriptions.Item label="Gender">
              {currentGuest.gender ? "Male" : "Female"}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {currentGuest.address}
            </Descriptions.Item>
          </Descriptions>
        )}
      </div>
      <Divider />
      <div className="text-xl my-4">Borrow book history:</div>
      {!isLoading && <Table columns={columns} dataSource={filteredData} />}
    </div>
  );
};

export default GuessDetail;

// works when >= 5.8.0, recommended ✅
