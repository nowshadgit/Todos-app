
const getActionsFormate = (action, data) => {
  const formate = data ? { type: action, data } : { type: action };
  return formate;
};


function onPagination(stage, totalPages) {
  let { currentPage } = this.state;
  let { start } = this.state;
  let { end } = this.state;
  if (stage === 'next') {
    currentPage += 1;
    if (currentPage === this.state.end + 1) {
      start += 1;
      end = currentPage;
    }
  } else if (stage === 'prev') {
    currentPage -= 1;
    if (currentPage === this.state.start - 1) {
      start = currentPage;
      end -= 1;
    }
  } else if (stage === 'prevEllipsis') {
    if (this.state.start > 5) {
      start = this.state.start - 5;
      end = this.state.end - 5;
    } else if (this.state.start < 5) {
      start = 1;
      end = start + 4;
    } else {
      start = this.state.start;
      end = this.state.end;
    }
    currentPage = start;
  } else if (stage === 'lastPage') {
    end = totalPages;
    start = totalPages - 4;
    currentPage = totalPages;
  } else if (stage === 'firstPage') {
    end = 5;
    currentPage = 1;
    start = 1;
  } else {
    if (this.state.end + 4 <= totalPages) {
      start = this.state.start + 5;
      end = this.state.end + 5;
    } else {
      start = totalPages - 4;
      end = totalPages;
    }
    currentPage = start;
  }
  this.setState({
    end,
    start,
    currentPage
  });
}

function onPageChange(number) {
  this.setState({ currentPage: number });
}

const redirect = (props, url) => {
  props.history.push(url);
};

export {
  getActionsFormate,
  onPageChange,
  onPagination,
  redirect
};
