import { gql} from '@apollo/client';
export const GET_CATEGORIES_NAMES = gql`
	query  getCategoriesNames {
		categories {
			name
		}
	}
`;