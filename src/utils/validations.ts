export const category = {
	title: [
		(v: string) => !!v || 'messages.enterCategoryName',
		(v: string) => (v && v.length >= 3 && v.length <= 32) || 'category_rules'
	],
	limit: [
		(v: number) => !!v || 'messages.enterLimit',
		(v: number) => (v && v >= 100) || 'messages.limit_rules'
	]
};

export const user = {
	name: [
		(v: string) => !!v || 'messages.enterName',
		(v: string) => (v && v.length >= 3 && v.length <= 32) || 'name_rules'
	],
	email: [
		(v: string) => !!v || 'enter_Email',
		(v: string) =>
			(v && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)) ||
			'email_rules'
	],
	password: [
		(v: string) => !!v || 'enter_Pass',
		(v: string) => (v && v.length >= 6 && v.length <= 32) || 'pass_rules'
	],
	agree: [(v: boolean) => !!v || 'agree_rules']
};

export const record = {
	amount: [
		(v: number) => !!v || 'messages.enterAmount',
		(v: number) => (v && v >= 1) || 'messages.amount_rules'
	],
	description: [(v: string) => v.length <= 2056 || 'messages.description_rules']
};
