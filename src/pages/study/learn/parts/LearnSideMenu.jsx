// 학습 사이드 메뉴: 학습 화면에서 공통으로 사용하는 왼쪽 메뉴
import * as S from "../style";

const LearnSideMenu = ({ menus = [], onMenu, onSelectType }) => {

  return (
    <S.SideMenu aria-label="학습 메뉴">
      {menus.map((menu) => (
        <S.SideButton
          key={menu.id}
          type="button"
          $active={menu.active}
          onMouseEnter={() => onSelectType?.(menu)}
          onFocus={() => onSelectType?.(menu)}
          onClick={() => onMenu(menu)}
        >
          <span>{menu.icon}</span>
          {menu.label}
        </S.SideButton>
      ))}
    </S.SideMenu>
  );
};

export default LearnSideMenu;
