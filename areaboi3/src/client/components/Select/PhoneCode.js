import React, { useEffect, useRef, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { phoneCodes as pc } from '../../utils';
import styles from './PhoneCode.module.css';

export default function PhoneCodeSelect({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('+234');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+234');
  const boxContainerRef = useRef();
  const [phoneCodes] = useState(pc);
  const [codesToShow, setCodesToShow] = useState(phoneCodes);
  const [search, setSearch] = useState('');
  const [abbr, setAbbr] = useState('');

  const handleCodeSelected = (code, country) => {
    setSelected(code);
    setSelectedCountryCode(country);
    setIsOpen(false);
  };

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  useEffect(() => {
    pc.filter((p) => {
      if (p.countryCode === selected) {
        setAbbr(p.countryAbbr.toLowerCase());
      }
    });
  }, [selected]);

  useEffect(() => {
    if (search) {
      const lSearch = search.toLowerCase();
      setCodesToShow(
        phoneCodes.filter(
          ({ countryAbbr, countryCode, countryName }) =>
            (countryAbbr && countryAbbr.toLowerCase().includes(lSearch)) ||
            (countryCode && countryCode.toLowerCase().includes(lSearch)) ||
            (countryName && countryName.toLowerCase().includes(lSearch))
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
                onChange={({ target: { value } }) => setSearch(value)}
                placeholder="Search Country Code"
              />
            </div>
            {codesToShow.map(({ countryAbbr, countryCode, countryName }) => (
              <div
                key={countryAbbr + countryCode}
                className={
                  styles.phone_code +
                  (countryCode === selected &&
                  selectedCountryCode === countryAbbr
                    ? ' selected'
                    : '')
                }
                role="button"
                onClick={() => handleCodeSelected(countryCode, countryAbbr)}>
                <div
                  style={{
                    width: '1rem',
                    height: '1rem',
                    marginRight: '.5rem'
                  }}>
                  <img src={`static/img/flags/${countryAbbr}.svg`} />
                </div>
                <span>
                  {countryName} {countryCode}
                </span>
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
          <div
            style={{
              width: '1.5rem',
              height: '1.5rem'
            }}>
            <img src={`static/img/flags/${abbr}.svg`} />
          </div>
        </button>
      </Popover>
    </div>
  );
}
