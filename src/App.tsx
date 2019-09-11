import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Page, Select } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.scss';

const App = (): JSX.Element => {
  const [year, setYear] = useState('1945');

  return (
    <Page>
      <div className="main">
        <Select
          modifier="material"
          value={year}
          onChange={(e): void => setYear(e.target.value)}>
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
          <option value="1952">昭和27年 (1952)</option>
          <option value="1953">昭和28年 (1953)</option>
          <option value="1954">昭和29年 (1954)</option>
          <option value="1955">昭和30年 (1955)</option>
          <option value="1956">昭和31年 (1956)</option>
          <option value="1957">昭和32年 (1957)</option>
          <option value="1958">昭和33年 (1958)</option>
          <option value="1959">昭和34年 (1959)</option>
          <option value="1960">昭和35年 (1960)</option>
          <option value="1961">昭和35年 (1961)</option>
          <option value="1962">昭和37年 (1962)</option>
          <option value="1963">昭和38年 (1963)</option>
          <option value="1964">昭和39年 (1964)</option>
          <option value="1965">昭和40年 (1965)</option>
          <option value="1966">昭和41年 (1966)</option>
          <option value="1967">昭和42年 (1967)</option>
          <option value="1968">昭和43年 (1968)</option>
          <option value="1969">昭和44年 (1969)</option>
          <option value="1970">昭和45年 (1970)</option>
          <option value="1971">昭和46年 (1971)</option>
          <option value="1972">昭和47年 (1972)</option>
          <option value="1973">昭和48年 (1973)</option>
          <option value="1974">昭和49年 (1974)</option>
          <option value="1975">昭和50年 (1975)</option>
          <option value="1976">昭和51年 (1976)</option>
          <option value="1977">昭和52年 (1977)</option>
          <option value="1978">昭和53年 (1978)</option>
          <option value="1979">昭和54年 (1979)</option>
          <option value="1980">昭和55年 (1980)</option>
          <option value="1981">昭和56年 (1981)</option>
          <option value="1982">昭和57年 (1982)</option>
          <option value="1983">昭和58年 (1983)</option>
          <option value="1984">昭和59年 (1984)</option>
          <option value="1985">昭和60年 (1985)</option>
          <option value="1986">昭和61年 (1986)</option>
          <option value="1987">昭和62年 (1987)</option>
          <option value="1988">昭和63年 (1988)</option>
          <option value="1989">昭和64年, 平成元年 (1989)</option>
          <option value="1990">平成２年 (1990)</option>
          <option value="1991">平成３年 (1991)</option>
          <option value="1992">平成４年 (1992)</option>
          <option value="1993">平成５年 (1993)</option>
          <option value="1994">平成６年 (1994)</option>
          <option value="1995">平成７年 (1995)</option>
          <option value="1996">平成８年 (1996)</option>
          <option value="1997">平成９年 (1997)</option>
          <option value="1998">平成10年 (1998)</option>
          <option value="1999">平成11年 (1999)</option>
          <option value="2000">平成12年 (2000)</option>
          <option value="2001">平成13年 (2001)</option>
          <option value="2002">平成14年 (2002)</option>
          <option value="2003">平成15年 (2003)</option>
          <option value="2004">平成16年 (2004)</option>
          <option value="2005">平成17年 (2005)</option>
          <option value="2006">平成18年 (2006)</option>
          <option value="2007">平成19年 (2007)</option>
          <option value="2008">平成20年 (2008)</option>
          <option value="2009">平成21年 (2009)</option>
          <option value="2000">平成22年 (2010)</option>
          <option value="2011">平成23年 (2011)</option>
          <option value="2012">平成24年 (2012)</option>
          <option value="2013">平成25年 (2013)</option>
          <option value="2014">平成26年 (2014)</option>
          <option value="2015">平成27年 (2015)</option>
          <option value="2016">平成28年 (2016)</option>
          <option value="2017">平成29年 (2017)</option>
          <option value="2018">平成30年 (2018)</option>
          <option value="2019">平成31年, 令和元年 (2019)</option>
          <option value="2020">令和２年 (2020)</option>
          <option value="2021">令和３年 (2021)</option>
          <option value="2022">令和４年 (2022)</option>
          <option value="2023">令和５年 (2023)</option>
          <option value="2024">令和６年 (2024)</option>
          <option value="2025">令和７年 (2025)</option>
          <option value="2026">令和８年 (2026)</option>
          <option value="2027">令和９年 (2027)</option>
          <option value="2028">令和10年 (2028)</option>
          <option value="2029">令和11年 (2029)</option>
          <option value="2030">令和12年 (2030)</option>
        </Select>
      </div>
    </Page>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
