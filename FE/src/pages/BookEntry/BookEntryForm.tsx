import { EyeOutlined, LineOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  InputNumber,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";
import { IBook } from "../../type/book.type";
import { getBook, getBooks } from "../../context/Book/book.slice";
import { getGuests } from "../../context/Guest/guest.slice";
import { SearchProps } from "antd/es/input";
import { IBookEntryPost } from "../../type";
import {
  addBookEntry,
  getBookEntries,
} from "../../context/BookEntry/bookEntry.slice";

const { Search } = Input;

interface IBookExtend extends IBook {
  key: React.Key;
  index: number;
}

interface IBookEntry extends IBook {
  key: React.Key;
  index: number;
}

const BookEntryForm = () => {
  const dispatch = useAppDispatch();
  const books = useSelector((state: RootState) => state.book.booksDetail);

  const isLoading = useSelector((state: RootState) => state.book.isLoading);

  const filteredData: IBookExtend[] = books.map((b, index) => {
    return {
      ...b,
      key: b.id,
      index: index + 1,
    };
  });

  const columns: TableColumnsType<IBookExtend> = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      key: "index",
    },

    {
      title: "ISBN Id",
      dataIndex: "isbn",
      key: "isbn",
      render: (isbn: string) => {
        return (
          <Tooltip title={isbn}>
            <div className="max-w-[100px] text-wrap line-clamp-1">{isbn}</div>
          </Tooltip>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title: string) => {
        return (
          <Tooltip title={title}>
            <div className="max-w-[100px] text-wrap line-clamp-1">{title}</div>
          </Tooltip>
        );
      },
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      sorter: (a, b) => a.author.localeCompare(b.author),
      render: (author: string) => {
        return (
          <Tooltip title={author}>
            <div className="max-w-[100px] text-wrap line-clamp-1">{author}</div>
          </Tooltip>
        );
      },
      key: "author",
    },

    {
      title: "",
      dataIndex: "id",
      render: (id: string) => {
        return (
          <div className="flex gap-2 items-center justify-center">
            <Button className="p-0 aspect-square flex items-center justify-center">
              <Link className="text-blue-500 underline" to={`/book/d/${id} `}>
                <EyeOutlined />
              </Link>
            </Button>
            <Button
              disabled={!!entryBooks.find((e) => e.id === id)}
              onClick={() => hanlePlus(id)}
              className="text-blue-500 underline p-0 aspect-square flex items-center justify-center"
            >
              <PlusOutlined />
            </Button>
          </div>
        );
      },
      key: "id",
    },
  ];

  const entryBookcolumns: TableColumnsType<IBookEntry> = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      key: "index",
      fixed: "left",
      width: 70,
    },

    {
      title: "ISBN Id",
      dataIndex: "isbn",
      key: "isbn",
      fixed: "left",
      render: (isbn: string) => {
        return (
          <Tooltip title={isbn}>
            <div className="max-w-[100px] text-wrap line-clamp-1">{isbn}</div>
          </Tooltip>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title: string) => {
        return (
          <Tooltip title={title}>
            <div className="max-w-[100px] text-wrap line-clamp-1">{title}</div>
          </Tooltip>
        );
      },
      key: "title",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.author.localeCompare(b.author),
      render: (_, item) => {
        return (
          <div className="">
            <InputNumber
              defaultValue={1}
              onChange={(e) => {
                const index = filterEntryBooks.findIndex(
                  (fe) => fe.id === item.id
                );
                if (e) {
                  filterEntryBooks[index].quantity = e.toString();
                }
              }}
            />
          </div>
        );
      },
      key: "quantity",
    },

    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.author.localeCompare(b.author),
      render: (price: number, item) => {
        return (
          <div className="">
            <InputNumber
              defaultValue={price}
              onChange={(e) => {
                const index = filterEntryBooks.findIndex(
                  (fe) => fe.id === item.id
                );
                if (e) {
                  filterEntryBooks[index].price = e;
                }
              }}
            />
          </div>
        );
      },
      key: "quantity",
    },

    {
      title: "",
      dataIndex: "id",
      align: "end",
      render: (id: string) => {
        return (
          <div className="flex gap-2 items-center justify-center">
            <Button
              onClick={() => handleRemoveList(id)}
              className="text-blue-500 underline p-0 aspect-square flex items-center justify-center"
            >
              <LineOutlined />
            </Button>
          </div>
        );
      },
      key: "id",
    },
  ];

  const hanlePlus = (id: string) => {
    const isExisting = entryBooks.find((e) => e.id === id);

    if (!isExisting) {
      dispatch(getBook(id))
        .unwrap()
        .then((res) => {
          setEntryBooks((prev) => {
            console.log(prev);
            return [...prev, res as IBook];
          });
        });
    }
  };

  const handleRemoveList = (id: string) => {
    const filterData = entryBooks.filter((e) => e.id !== id);
    setEntryBooks(filterData);
  };

  const onSearchBooks: SearchProps["onSearch"] = (value) => {
    dispatch(getBooks({ q: value }));
  };

  useEffect(() => {
    dispatch(getBooks({}));
    dispatch(getGuests({}));
  }, [dispatch]);

  // Store book entry
  const [entryBooks, setEntryBooks] = useState<IBook[]>([]);
  const filterEntryBooks: IBookEntry[] = entryBooks.map((e, index) => {
    return {
      ...e,
      key: e.id,
      index: index + 1,
      quantity: 1,
    };
  });

  const onFinish = () => {
    const submitData: IBookEntryPost = {
      importBookDetails: filterEntryBooks.map((f) => ({
        bookId: f.id,
        price: f.price.toString(),
        quantity: f.quantity,
      })),
    };

    if (submitData) {
      dispatch(addBookEntry(submitData))
        .unwrap()
        .then(() => {
          setEntryBooks([]);
          dispatch(getBookEntries({}));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div className="text-3xl font-semibold my-2 bg-blue-500 py-4 text-white text-center">
        Book entry
      </div>

      <div className="mt-8 space-y-10">
        <div className="grid grid-cols-2 gap-8">
          <div>
            {!isLoading && (
              <div className="space-y-4 shadow-md p-4 overflow-x-scroll">
                <div className="text-xl font-semibold">
                  Select books to entry
                </div>
                <Search
                  size="large"
                  placeholder="Search for books"
                  onSearch={onSearchBooks}
                  enterButton
                />
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  pagination={{
                    showTotal: (t) => <div>Totals: {t}</div>,
                    total: filteredData.length,
                    defaultPageSize: 4,
                    pageSizeOptions: [4, 10, 20, 30, 50, 100],
                    showSizeChanger: true,
                  }}
                />
              </div>
            )}
          </div>
          <div>
            {!isLoading && (
              <div className="space-y-4 shadow-md p-4 h-full overflow-x-scroll">
                <div className="text-xl font-semibold">Choosed books</div>
                <Table
                  size="large"
                  columns={entryBookcolumns}
                  dataSource={filterEntryBooks}
                  pagination={{
                    showTotal: (t) => <div>Totals: {t}</div>,
                    total: entryBooks.length,
                    defaultPageSize: 4,
                    pageSizeOptions: [4, 10, 20, 30, 50, 100],
                    showSizeChanger: true,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-x-4 w-fit ml-auto">
          <Button
            disabled={filterEntryBooks.length === 0}
            size="large"
            type="primary"
            onClick={onFinish}
          >
            Save
          </Button>
          <Button
            size="large"
            type="primary"
            disabled={entryBooks.length === 0}
            onClick={() => {
              setEntryBooks([]);
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookEntryForm;
