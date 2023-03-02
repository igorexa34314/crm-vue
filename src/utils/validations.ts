import { useLocalizeFilter } from '@/filters/localizeFilter';

export const category = {
	title: [
		(v: string) => !!v || useLocalizeFilter('message_EnterCategoryName'),
		(v: string) => (v && v.length >= 3 && v.length <= 32) || useLocalizeFilter('category_rules')
	],
	limit: [(v: number) => !!v || useLocalizeFilter('message_EnterLimit'), (v: number) => (v && v >= 100) || useLocalizeFilter('limit_rules')]
};

export const user = {
	name: [(v:string) => !!v || useLocalizeFilter('message_EnterName'), (v: string) => (v && v.length >= 3 && v.length <= 32) || useLocalizeFilter('name_rules')],
	email: [(v: string) => !!v || useLocalizeFilter('enter_Email'), (v: string) => (v && /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) || useLocalizeFilter('email_rules')],
	password: [(v: string) => !!v || useLocalizeFilter('enter_Pass'), (v: string) => (v && v.length >= 6 && v.length <= 32) || useLocalizeFilter('pass_rules')]
};
