function convertToNextDayStartUTC(dateString: string) {
	const originalDate = new Date(dateString); // Chuyển đổi chuỗi thời gian sang đối tượng Date
	const adjustedDate = new Date(
		originalDate.getFullYear(),
		originalDate.getMonth(),
		originalDate.getDate() + 1, // Thêm 1 ngày để chuyển đến 00:00:00 UTC ngày tiếp theo
		0, // Giờ
		0, // Phút
		0, // Giây
	);

	return adjustedDate.toISOString(); // Chuyển đổi thành chuỗi ISO 8601
}

export default convertToNextDayStartUTC;
