import classes from './comment-list.module.css';

function CommentList(props) {
  const { items } = props;
  console.log('the items' + items);
  return (
    <ul className={classes.comments}>
      <h1>hhhhh</h1>

      {items.map((item) => {
        return (
          <li key={item._id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
