import {useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_CATEGORY_NAMES } from './queries';



export const useCategories = (query) => {
	const {  data, loading, error } = useQuery(query);
	return data
}