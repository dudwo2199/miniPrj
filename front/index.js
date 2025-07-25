onload = () => {
  sessionStorage.clear();
  reqCategory();
  reqBoards(1);
};

function reqCategory() {
  const url = 'http://127.0.0.1/api/board/category';

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('카테고리 읽기 실패');

      return res.json();
    })
    .then((data) => {
      sessionStorage.setItem('categorys', JSON.stringify(data));
    })
    .catch((err) => {
      alert(err.message);
    });
}

function reqBoards(p) {
  const url = `http://127.0.0.1/api/board?currPage=${p}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('게시판 읽어오기 실패');
      return res.json();
    })
    .then((result) => {
      renderBoard(result.data);
      renderPagination(result.pvo);
    })
    .catch((err) => {
      alert(err.message);
    });
}

function renderBoard(data) {
  const tbody = document.querySelector('tbody');
  let row = '';

  const categorys = JSON.parse(sessionStorage.getItem('categorys'));
  data.forEach((vo) => {
    const categoryName = categorys.find(
      (x) => x.categoryNo === vo.categoryNo
    ).categoryName;
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

function renderPagination(pvo) {
  const tfoot = document.querySelector('tfoot');
  let foot = '';

  if (pvo.startPage != 1) {
    foot = `<button onclick="reqBoards(${pvo.startPage - 1});">이전</button>`;
  }
  for (let i = pvo.startPage; i <= pvo.endPage; ++i) {
    if (pvo.currentPage == i) {
      foot += `<button disabled onclick="reqBoards(${i});">${i}</button>`;
    } else {
      foot += `<button onclick="reqBoards(${i});">${i}</button>`;
    }
  }
  if (pvo.endPage != pvo.maxPage) {
    foot += `<button onclick="reqBoards(${pvo.endPage + 1});">다음</button>`;
  }
  tfoot.innerHTML = `
      <tr>
        <th colspan='4'>
        ${foot}
        </th>
      </tr>
      `;
}

function lookAt(no) {
  sessionStorage.setItem('TargetNo', no);
  location.href = 'lookat.html';
}
