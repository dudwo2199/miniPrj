let categorys = [];
let TargetVo = null;
onload = () => {
  categorys = JSON.parse(sessionStorage.getItem('categorys'));
  const TargetNo = sessionStorage.getItem('TargetNo');

  reqNode(TargetNo);
};

async function reqNode(no) {
  sessionStorage.setItem('TargetNo', no);
  const url = `http://127.0.0.1/api/board/${no}`;

  const res = await fetch(url);
  const data = await res.json();

  TargetVo = data || [];

  renderTarget(TargetVo);
}

const numberTag = document.querySelector('#number');
const titleTag = document.querySelector('input[type=text]');
const contentTag = document.querySelector('textarea');
const createdAt = document.querySelector('#createdAt');
const modifiedAt = document.querySelector('#modifiedAt');
const categoryTag = document.querySelector('#category');

async function renderTarget(vo) {
  let opt = '';
  categorys.forEach((cate) => {
    opt += `
  <option value=${cate.categoryNo} ${
      cate.categoryNo === vo.categoryNo ? 'selected' : ''
    }>${cate.categoryName}</option>
  `;
  });
  categoryTag.innerHTML = opt;

  numberTag.textContent = `글번호:${vo.no}`;
  titleTag.value = vo.title;
  createdAt.innerHTML = `작성시간: ${vo.createdAt}`;
  modifiedAt.innerHTML = `수정시간: ${vo.modifiedAt || ''}`;
  contentTag.value = vo.content;

  reqParent(vo.parentNo);
  reqChild(vo.no);
}

async function reqParent(parentNo) {
  if (parentNo === null || parentNo === undefined) {
    renderParentList(null);
    return;
  }

  const res = await fetch(`http://127.0.0.1/api/board/${parentNo}`);
  const data = await res.json();
  const parent = data || {};

  renderParentList(parent);
}

async function reqChild(childNo) {
  if (childNo === null || childNo === undefined) {
    renderChildList(null);
    return;
  }
  const res = await fetch(`http://127.0.0.1/api/board/child/${childNo}`);
  const data = await res.json();
  const child = data || [];

  renderChildList(child);
}

function renderParentList(parentVo) {
  const parentCanvas = document.querySelector('#parentNode>#parent-canvas');

  if (parentVo === null || parentVo === undefined) {
    parentCanvas.innerHTML = '';
    return;
  }

  parentCanvas.innerHTML = `
  <a onclick="reqNode(${parentVo.no})">${parentVo.no}|${parentVo.title}</a>
  `;
}

function renderChildList(childVo) {
  const childCanvas = document.querySelector('#childNode>#child-canvas');
  if (childVo === null || childVo === undefined) {
    childCanvas.innerHTML = '';
    return;
  }
  let nodeHTML = '';
  childVo.forEach((vo) => {
    nodeHTML += `
    <a onclick="reqNode(${vo.no})">${vo.no}|${vo.title}</a><br>
    `;
  });
  childCanvas.innerHTML = nodeHTML;
}

function onModify() {
  const url = 'http://127.0.0.1/api/board';
  const vo = {
    no: TargetVo.no,
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

function onEntry() {
  sessionStorage.setItem('TargetNo', TargetVo.no);
  location.href = "/write.html";
}
