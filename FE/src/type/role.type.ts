interface IRole {
	id: string;
	name: string;
	claims?: IClaim;
}

interface IClaim {
	isBookRead: boolean;
	isBookEditAndCreate: boolean;
	isBookDelete: boolean;
	isStaffRead: boolean;
	isStaffDelete: boolean;
	isStaffEditAndCreate: boolean;
	isMemberRead: boolean;
	isMemberDelete: boolean;
	isMemberEditAndCreate: boolean;
	isCategoryRead: boolean;
	isCategoryEditAndCreate: boolean;
	isCategoryDelete: boolean;
	isBorrowBookRead: boolean;
	isBorrowBookCreateAndEdit: boolean;
	isImportBookRead: boolean;
	isImportBookCreate: boolean;
	isIncomeRead: boolean;
}
export type { IRole, IClaim };
