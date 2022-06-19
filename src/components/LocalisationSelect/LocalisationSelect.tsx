import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactFlagsSelect from "react-flags-select";


const LanguageSelect = () => {

	const { t, i18n } = useTranslation();

	function changeLanguage(code: string) {
		i18n.changeLanguage(code);
	}

	return (
		<ReactFlagsSelect
			countries={["GB", "NL"]}
			customLabels={ { GB: "English", NL: "Dutch"}}
			placeholder={"Language"}
			selected={i18n.language}
			onSelect={code => changeLanguage(code)}
			className="selectLanguage"
			selectButtonClassName="selectLanguageButton"
		/>
	);

};

export default LanguageSelect