import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
    const ids = ['1', '2', '3'];
    const paths = ids.map(id => ({ params: { id } }));
    return { paths, fallback: true };
  };