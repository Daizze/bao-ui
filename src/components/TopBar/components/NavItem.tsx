import React from 'react'
import {StyledAbsoluteLink} from "../topBarCss";
import NavDropdown from "./NavDropdown";
import { useTranslation } from "react-i18next";

interface NavItemProps {
	navItem: any
}

const NavItem: React.FC<NavItemProps> = ({navItem}) => {

	const { t } = useTranslation();

	switch(navItem.type) {
		case 'link':
			return <StyledAbsoluteLink href={navItem.link}>{t(navItem.title)}</StyledAbsoluteLink>;

		case 'dropdown':
			return <NavDropdown navItem={navItem} />
	}
};

export default NavItem
