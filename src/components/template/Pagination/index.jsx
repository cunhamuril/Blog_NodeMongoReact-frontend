import React from 'react';
import {
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
} from 'mdbreact';

// import { Container } from './styles';

const Pagination = ({ page, dataInfo, setPage }) => {
  function prevPage() {
    if (page === 1) return
    setPage(page - 1)
  }

  function nextPage() {
    if (page === dataInfo.totalPages) return
    setPage(page + 1)
  }

  // Condição que renderiza o número de páginas existentes e ativa a página atual
  const active = dataInfo.page;
  let items = []
  for (let i = 1; i <= dataInfo.totalPages; i++) {
    items.push(
      <MDBPageItem key={i} active={i === active}>
        <MDBPageNav
          onClick={() => setPage(i)}
        >
          {i}
        </MDBPageNav>
      </MDBPageItem>
    )
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <MDBPagination className="mb-5">
        <MDBPageItem disabled={page === 1 ? true : false}>
          <MDBPageNav
            aria-label="Anterior"
            onClick={prevPage}
          >
            <span aria-hidden={true}>Anterior</span>
          </MDBPageNav>
        </MDBPageItem>

        {/* Chamada dos items com numero de pages */}
        {items}

        <MDBPageItem disabled={page === dataInfo.totalPages ? true : false}>
          <MDBPageNav
            aria-label="Previous"
            onClick={nextPage}
          >
            <span aria-hidden="true">Próximo</span>
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>
    </div>
  )
};

export default Pagination;
