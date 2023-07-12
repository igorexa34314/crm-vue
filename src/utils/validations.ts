export const category = {
	title: [
		(v: string) => !!v || 'messages.enter_category_name',
		(v: string) => (v && v.length >= 3 && v.length <= 32) || 'rules.category'
	],
	limit: [
		(v: number) => !!v || 'messages.enter_limit',
		(v: number) => (v && v >= 100) || 'rules.limit'
	]
};

export const user = {
	displayName: [
		(v: string) => !!v || 'messages.enter_displayName',
		(v: string) => (v && v.length >= 3 && v.length <= 32) || 'rules.displayName'
	],
	firstName: [(v: string) => (v && v.length >= 2 && v.length <= 64) || 'rules.firstName'],
	lastName: [(v: string) => (v && v.length >= 2 && v.length <= 64) || 'rules.lastName'],
	bio: [(v: string) => (v && v.length <= 2056) || 'rules.bio'],
	email: [
		(v: string) => !!v || 'messages.enter_email',
		(v: string) =>
			(v && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)) ||
			'rules.email'
	],
	password: [
		(v: string) => !!v || 'messages.enter_pass',
		(v: string) => (v && v.length >= 6 && v.length <= 32) || 'rules.pass'
	],
	agree: [(v: boolean) => !!v || 'rules.agree']
};

export const record = {
	amount: [
		(v: number) => !!v || 'messages.enter_amount',
		(v: number) => (v && v >= 1) || 'rules.amount'
	],
	description: [(v: string) => v.length <= 2056 || 'rules.description']
};
