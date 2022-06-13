function TabMenu(props) {

    const lis = [];
  
    for (let i = 0; i < props.tabList.length; i++) {
      let select = props.tabList[i];
      lis.push(
        <li key={select.id} id={select.id}>
          <a href={select.subtitle} onClick={
            function (event) {
              event.preventDefault();
              props.onChangeMode(event.target.parentElement.id);
            }}>
            {select.subtitle}
          </a>
        </li>);
    }
  
    return (
      <ul>
        {lis}
      </ul>
    )
  }

  export default TabMenu;