let categorys = [];
onload = () => {
  const data = sessionStorage.getItem('lookat');
  categorys = JSON.parse(sessionStorage.getItem('categorys'));
  renderLookAt(JSON.parse(data));
};

const titleTag = document.querySelector('input[type=text]');
const contentTag = document.querySelector('textarea');
const createdAt = document.querySelector('#createdAt');
const modifiedAt = document.querySelector('#modifiedAt');
const categoryTag = document.querySelector('#category');

let no = 0;
function renderLookAt(vo) {
  let opt = '';
  categorys.forEach((cate) => {
    opt += `
  <option value=${cate.categoryNo} ${
      cate.categoryNo === vo.categoryNo ? 'selected' : ''
    }>${cate.categoryName}</option>
  `;
  });
  categoryTag.innerHTML = opt;

  no = vo.no;
  titleTag.value = vo.title;
  createdAt.innerHTML = `작성시간: ${vo.createdAt}`;
  modifiedAt.innerHTML = `수정시간: ${vo.modifiedAt || ''}`;
  contentTag.value = vo.content;

  reqChild(no);
}

async function reqChild(childNo) {
  const res = await fetch(`http://127.0.0.1/api/board/child/${childNo}`);
  const data = await res.json();
  const child = data || [];

  renderChildList(child);
}

function renderChildList(childVo) {
  const tbody = document.querySelector('tbody');
  let row = '';

  childVo.forEach((vo) => {
  const categoryName = categorys.find(x => x.categoryNo === vo.categoryNo).categoryName;
    row += `
        <tr onclick='lookAt(${vo.no})'>
          <td>${vo.no}</td>
          <td>${vo.title}</td>
          <td>${categoryName}</td>
          <td>${vo.createdAt}</td>
        </tr>
        `;
  });
  tbody.innerHTML = row;
}

function onModify() {
  const url = 'http://127.0.0.1/api/board';
  const vo = {
    no,
    title: titleTag.value,
    content: contentTag.value,
    categoryNo: categoryTag.value,
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
