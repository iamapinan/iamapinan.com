import { getDatabase, ref, get, query, orderByChild, limitToLast, startAt } from 'firebase/database';

export const fetchArticles = async (type, page = 1) => {
  const db = getDatabase();
  const articlesRef = ref(db, 'articles');
  let articlesQuery;

  if (type === 'latest') {
    articlesQuery = query(
      articlesRef,
      orderByChild('date'),
      limitToLast(page * 16)
    );
  } else if (type === 'popular') {
    articlesQuery = query(
      articlesRef,
      orderByChild('popularity'),
      limitToLast(page * 16)
    );
  } else {
    articlesQuery = query(
      articlesRef,
      orderByChild('date'),
      startAt((page - 1) * 16),
      limitToLast(16)
    );
  }

  const snapshot = await get(articlesQuery);
  const data = snapshot.val();
  return Object.values(data || {});
};

export const getArticle = async (id) => {
  const db = getDatabase();
  const articleRef = ref(db, `articles/${id}`);
  const snapshot = await get(articleRef);
  return snapshot.val();
};