import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  GetProp,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadProps,
  message,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";
import { getCategorys } from "../../context/Category/category.slice";
import { addBook, getBooks, updateBook } from "../../context/Book/book.slice";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface BookFormType {
  handleClose: () => void;
  form: FormInstance;
}

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const BookForm = (props: BookFormType) => {
  const dispatch = useAppDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categorys
  );
  const edittingBook = useSelector(
    (state: RootState) => state.book.edittingBook
  );
  const isLoading = useSelector((state: RootState) => state.category.isLoading);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    edittingBook?.urlImage ? edittingBook.urlImage : ""
  );

  const handleChange: UploadProps["onChange"] = (info) => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as FileType, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = () => {
    const { title, isbn, categoryId, author, image, price, publishedYear } =
      props.form.getFieldsValue();
    if (edittingBook?.id) {
      dispatch(
        updateBook({
          data: {
            author,
            categoryId,
            image,
            isbn,
            price,
            publishedYear,
            title,
          },
          id: edittingBook.id,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(getBooks({}));
          props.handleClose();
          setImageUrl("");
          props.form.resetFields();
        })
        .catch((err) => {
          const messages = err;
          console.log(messages);

          // for (const key in messages.message) {
          // 	console.log(messages.message);
          // }
        });
    } else {
      dispatch(
        addBook({
          author,
          categoryId,
          image,
          isbn,
          price,
          publishedYear,
          title,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(getBooks({}));
          props.handleClose();
          setImageUrl("");
          props.form.resetFields();
        })
        .catch((err) => {
          const messages = err;
          console.log(messages);

          // for (const key in messages.message) {
          // 	console.log(messages.message);
          // }
        });
    }
  };

  useEffect(() => {
    dispatch(getCategorys({}));
  }, [dispatch]);

  useEffect(() => {
    props.form.resetFields();
    setImageUrl(
      edittingBook?.id
        ? edittingBook?.urlImage
          ? edittingBook?.urlImage
          : ""
        : ""
    );
  }, [edittingBook, props.form]);
  const arrayYear = [];
  for (let index = 2000; index <= 2024; index++) {
    arrayYear.push(index);
  }
  return (
    <div>
      <div className="mt-8">
        <Form
          form={props.form}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          layout="horizontal"
        >
          <Form.Item
            initialValue={edittingBook?.title}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            name={"title"}
            label="Title:"
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={edittingBook?.isbn}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            name={"isbn"}
            label="ISBN id:"
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={edittingBook?.categoryId}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            name={"categoryId"}
            label="Category:"
          >
            <Select>
              {!isLoading &&
                categories.map((c) => (
                  <Select.Option key={c.categoryId} value={c.categoryId}>
                    {c.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            initialValue={edittingBook?.author}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            name={"author"}
            label="Author:"
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={edittingBook?.price}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            name={"price"}
            label="Price"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            initialValue={edittingBook?.publishedYear}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
            name={"publishedYear"}
            label="Publish year:"
          >
            <Select>
              {arrayYear.map((index) => (
                <Select.Option value={index.toString()}>{index}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={"image"}
            label="Images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <div className="flex items-center justify-center gap-2">
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Save
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => props.handleClose()}
                type="default"
                htmlType="reset"
                size="large"
              >
                Cancel
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BookForm;
