export const formatCurrency = (amount: number): string => {
	// Chuyển số thành chuỗi và tạo một mảng các chuỗi từ chuỗi số
	const parts = String(amount).split(".");

	// Lấy phần nguyên
	let integerPart = parts[0];

	// Tạo mảng các phần tử trong chuỗi nguyên
	const integerDigits = integerPart.split("");

	// Chia mảng thành các nhóm 3 chữ số từ cuối lên đầu
	const groups = [];
	while (integerDigits.length > 0) {
		groups.unshift(integerDigits.splice(-3).join(""));
	}

	// Nối các nhóm lại với nhau, phân cách bằng dấu phẩy
	integerPart = groups.join(",");

	// Trả về chuỗi đã được định dạng
	return `${integerPart}đ`;
};
