import { httpClient } from './http'; // httpClient를 import

const API_BASE_URL = '/api/comments';

// 댓글 추가
export const addComment = async (
articleId: number, content: string, token: string): Promise<Comment> => {
  const response = await httpClient.post<Comment>(
    `${API_BASE_URL}`,
    { articleId, content}, // content 인코딩 없이 전달
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 특정 게시글의 댓글 조회
export const getCommentsByArticle = async (
  articleId: number
): Promise<Comment[]> => {
  const response = await httpClient.get<Comment[]>(`${API_BASE_URL}/article/${articleId}`);
  return response.data;
};

// 댓글 수정
export const updateComment = async (
  commentId: number,
  content: string,
  token: string
): Promise<Comment> => {
  const response = await httpClient.put<Comment>(
    `${API_BASE_URL}/${commentId}`,
    { content }, // content 인코딩 없이 전달
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (
  commentId: number,
  token: string
): Promise<void> => {
  await httpClient.delete(`${API_BASE_URL}/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
