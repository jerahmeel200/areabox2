import React, { useEffect, useRef, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import Chart from '../../utils/chart';
import styles from './PhoneCode.module.css';
import { phoneCodes as pc } from '../../utils/phone-codes';

export default function PhoneCodeSelect({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('+234');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+234');
  const boxContainerRef = useRef();
  const [phoneCodes] = useState(pc);
  const [codesToShow, setCodesToShow] = useState(phoneCodes);
  const [search, setSearch] = useState('');

  const handleCodeSelected = (code, country) => {
    setSelected(code);
    setSelectedCountryCode(country);
    setIsOpen(false);
  };

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  useEffect(() => {
    if (search) {
      const lSearch = search.toLowerCase();
      setCodesToShow(
        phoneCodes.filter(
          ({ countryAbbr, countryCode, countryName }) =>
            countryAbbr.toLowerCase().includes(lSearch) ||
            countryCode.toLowerCase().includes(lSearch) ||
            countryName.toLowerCase().includes(lSearch)
        )
      );
    } else {
      setCodesToShow(phoneCodes);
    }
  }, [search]);

  return (
    <div ref={boxContainerRef}>
      <Popover
        isOpen={isOpen}
        positions={['bottom']}
        align="start"
        reposition={true}
        containerClassName={styles.container}
        parentElement={boxContainerRef.current}
        onClickOutside={() => setIsOpen(false)}
        content={
          <div className={styles.items}>
            <div>
              <input
                type="text"
                className={styles.phoneCodeSearch}
                autoFocus={!isOpen && !search}
                onChange={({ target: { value } }) => setSearch(value)}
                placeholder="Search Country Code"
              />
            </div>
            {codesToShow.map(({ countryAbbr, countryCode, countryName }) => (
              <div
                key={countryAbbr + countryCode}
                className={
                  'phone-code' +
                  (countryCode === selected &&
                  selectedCountryCode === countryAbbr
                    ? ' selected'
                    : '')
                }
                role="button"
                onClick={() => handleCodeSelected(countryCode, countryAbbr)}>
                {countryCode} {countryName}
              </div>
            ))}
          </div>
        }>
        <button
          role="button"
          type="button"
          className={styles.phoneCode}
          onClick={() => setIsOpen(!isOpen)}>
          {selected}
        </button>
      </Popover>
    </div>
  );
}
