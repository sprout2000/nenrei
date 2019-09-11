import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Page, Select } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.scss';

const App = (): JSX.Element => {
  const [year, setYear] = useState(1945);

  const handleOnYear = (val: string): void => {
    const year = val as unknown as number;
    setYear(year);
  }

  return (
    <Page>
      <div className="main">
        <Select
          modifier="material"
          onChange={(e): void => handleOnYear(e.target.value)}>
          <option value="1912">大正元年 (1912)</option>
          <option value="1913">大正２年 (1913)</option>
          <option value="1914">大正３年 (1914)</option>
          <option value="1915">大正４年 (1915)</option>
          <option value="1916">大正５年 (1916)</option>
          <option value="1917">大正６年 (1917)</option>
          <option value="1918">大正７年 (1918)</option>
          <option value="1919">大正８年 (1919)</option>
          <option value="1920">大正９年 (1920)</option>
          <option value="1921">大正10年 (1921)</option>
          <option value="1922">大正11年 (1922)</option>
          <option value="1923">大正12年 (1923)</option>
          <option value="1924">大正13年 (1924)</option>
          <option value="1925">大正14年 (1925)</option>
          <option value="1926">大正15年, 昭和元年 (1926)</option>
          <option value="1927">昭和２年 (1927)</option>
          <option value="1928">昭和３年 (1928)</option>
          <option value="1929">昭和４年 (1929)</option>
          <option value="1930">昭和５年 (1930)</option>
          <option value="1931">昭和６年 (1931)</option>
          <option value="1932">昭和７年 (1932)</option>
          <option value="1933">昭和８年 (1933)</option>
          <option value="1934">昭和９年 (1934)</option>
          <option value="1935">昭和10年 (1935)</option>
          <option value="1936">昭和11年 (1936)</option>
          <option value="1937">昭和12年 (1937)</option>
          <option value="1938">昭和13年 (1938)</option>
          <option value="1939">昭和14年 (1939)</option>
          <option value="1940">昭和15年 (1940)</option>
          <option value="1941">昭和16年 (1941)</option>
          <option value="1942">昭和17年 (1942)</option>
          <option value="1943">昭和18年 (1943)</option>
          <option value="1944">昭和19年 (1944)</option>
          <option value="1945">昭和20年 (1945)</option>
          <option value="1946">昭和21年 (1946)</option>
          <option value="1947">昭和22年 (1947)</option>
          <option value="1948">昭和23年 (1948)</option>
          <option value="1949">昭和24年 (1949)</option>
          <option value="1950">昭和25年 (1950)</option>
          <option value="1951">昭和26年 (1951)</option>
        </Select>
      </div>
    </Page>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
