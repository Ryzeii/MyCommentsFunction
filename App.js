import React, { useEffect, useState } from "react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments"));
    if (savedComments) {
      setComments(savedComments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const addComment = () => {
    if (author.trim() && text.trim()) {
      const newComment = {
        author,
        text,
        time: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setAuthor("");
      setText("");
    }
  };
  const deleteComment = (index) => {
    const updateComments = comments.filter((_, i) => i !== index);
    setComments(updateComments);
  };
  return (
    <div>
      <h2>Комментарии</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <p>
              <b>Автор:</b>
              {comment.author}
            </p>
            <p>{comment.text}</p>
            <p>
              <b>Дата:</b>
              {comment.time}
            </p>
            <button onClick={() => deleteComment(index)}>Удалить</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Ваше имя"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <br />
      <br />
      <textarea
        placeholder="Ваш комментарий"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <br />
      <button onClick={addComment}>Добавить комментарий</button>
    </div>
  );
}
export default Comments;
