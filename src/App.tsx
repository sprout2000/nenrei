import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Page, Select } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.scss';

const App = (): JSX.Element => {
  const [value, setValue] = useState('34');

  return (
    <Page>
      <div className="main">
        <Select
          modifier="material"
          value={value}
          onChange={(event): void => setValue(event.target.value)}>
          <option value="1">大正元年 (1912)</option>
          <option value="2">大正２年 (1913)</option>
          <option value="3">大正３年 (1914)</option>
          <option value="4">大正４年 (1915)</option>
          <option value="5">大正５年 (1916)</option>
          <option value="6">大正６年 (1917)</option>
          <option value="7">大正７年 (1918)</option>
          <option value="8">大正８年 (1919)</option>
          <option value="9">大正９年 (1920)</option>
          <option value="10">大正10年 (1921)</option>
          <option value="11">大正11年 (1922)</option>
          <option value="12">大正12年 (1923)</option>
          <option value="13">大正13年 (1924)</option>
          <option value="14">大正14年 (1925)</option>
          <option value="15">大正15年, 昭和元年 (1926)</option>
          <option value="16">昭和２年 (1927)</option>
          <option value="17">昭和３年 (1928)</option>
          <option value="18">昭和４年 (1929)</option>
          <option value="19">昭和５年 (1930)</option>
          <option value="20">昭和６年 (1931)</option>
          <option value="21">昭和７年 (1932)</option>
          <option value="22">昭和８年 (1933)</option>
          <option value="23">昭和９年 (1934)</option>
          <option value="24">昭和10年 (1935)</option>
          <option value="25">昭和11年 (1936)</option>
          <option value="26">昭和12年 (1937)</option>
          <option value="27">昭和13年 (1938)</option>
          <option value="28">昭和14年 (1939)</option>
          <option value="29">昭和15年 (1940)</option>
          <option value="30">昭和16年 (1941)</option>
          <option value="31">昭和17年 (1942)</option>
          <option value="32">昭和18年 (1943)</option>
          <option value="33">昭和19年 (1944)</option>
          <option value="34">昭和20年 (1945)</option>
          <option value="35">昭和21年 (1946)</option>
          <option value="36">昭和22年 (1947)</option>
          <option value="37">昭和23年 (1948)</option>
          <option value="38">昭和24年 (1949)</option>
          <option value="39">昭和25年 (1950)</option>
          <option value="40">昭和26年 (1951)</option>
        </Select>
      </div>
    </Page>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
