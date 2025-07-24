onload = () => {
  const data = sessionStorage.getItem('lookat');
  renderLookAt(JSON.parse(data));
};

const titleTag = document.querySelector('input[type=text]');
const contentTag = document.querySelector('textarea');
const createdAt = document.querySelector('#createdAt');
const modifiedAt = document.querySelector('#modifiedAt');

let no = 0;
function renderLookAt(vo) {
  no = vo.no;
  titleTag.value = vo.title;
  createdAt.innerHTML = `작성시간: ${vo.createdAt}`;
  modifiedAt.innerHTML = `수정시간: ${vo.modifiedAt || ''}`;
  contentTag.value = vo.content;
}

function onModify() {
  const url = 'http://127.0.0.1/api/board';
  const vo = {
    no,
    title: titleTag.value,
    content: contentTag.value,
  };

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vo),
  })
    .then((res) => {
      if (!res.ok) throw new Error('수정 실패');

      alert('수정 성공');
      location.href = '/';
    })
    .catch((err) => {
      alert(err.message);
    });
}

function onDelete() {
  const url = `http://127.0.0.1/api/board/${no}`;

  fetch(url, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) throw new Error('삭제 실패');
      alert('삭제 성공');
      location.href = '/';
    })
    .catch((err) => {
      alert(err.message);
    });
}
