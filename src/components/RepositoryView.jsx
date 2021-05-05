import React from 'react';
import { useParams } from 'react-router';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading) return null;
  return (
    <RepositoryItem item={repository} showLink="true" />
  );
};

export default RepositoryView;