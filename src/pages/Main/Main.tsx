/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { convert } from '../../api/convert';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import Modal from '../../components/ModalLayout';
import SwapButton from '../../components/SwapButton/SwapButton';
import { currencyList } from '../../constans/currencyList';
import { useTypedSelector } from '../../hooks';
import { ICurrency } from '../../models/interfaceIcurrency';
import {
  fetchConvert,
  setAmount,
  setFromCurrency,
  setToCurrency,
  swapCurrency,
} from '../../redux/actions/actionsConvert';
import styles from './styles.module.scss';

interface IField {
  value: number;
  symbol: string;
  label: string;
  code: string;
}

interface IResult {
  from: IField;
  to: IField;
  rate: number;
}

function Main() {
  const dispatch = useDispatch();

  const [history, setHistory] = useState<string[] | undefined | []>();

  const [showHistory, setShowHistory] = useState<boolean>(false);

  const { toCurrency, fromCurrency, amount, result } = useTypedSelector(
    (state) => state.convertReducer
  );

  const toggleShowModal = () => {
    setShowHistory((prev) => !prev);
  };

  const getHistory = () => {
    const historyArray = localStorage.getItem('convertHistory')
      ? localStorage.getItem('convertHistory')?.split('|')
      : [];

    setHistory(historyArray);
    console.log(historyArray);
  };

  useEffect(() => {
    getHistory();

    addEventListener('storage', getHistory);

    return () => removeEventListener('storage', getHistory);
  }, []);

  return (
    <>
      <div className={styles.convert}>
        <div className={styles.convert__funcBlock}>
          <CustomInput
            value={amount}
            onChange={(v: number) => dispatch(setAmount(v))}
            symbol={fromCurrency.symbol}
          />
          <CurrencySelector
            value={fromCurrency}
            onChangeValue={(v: ICurrency) => {
              dispatch(setFromCurrency(v));
            }}
          />
          <SwapButton onClick={() => dispatch(swapCurrency())} />
          <CurrencySelector
            value={toCurrency}
            onChangeValue={(v: ICurrency) => {
              dispatch(setToCurrency(v));
            }}
          />
        </div>
        <div className={styles.convert__resBlock}>
          {result && (
            <div className={styles.convert__response}>
              <div>
                <span>{`${result?.from.value}  ${result?.from.label}=`}</span>
                <br />
                <span>{`${result?.to.value}  ${result?.to.label}`}</span>
              </div>

              <div>
                <div className={styles.convert__response__rate}>{`1 ${
                  result.from.code
                } = ${result.rate.toFixed(4)} ${result.to.code}`}</div>
                <div className={styles.convert__response__rate}>{`1 ${
                  result.to.code
                } = ${(1 / result.rate).toFixed(4)} ${result.from.code}`}</div>
              </div>
            </div>
          )}
          <div className={styles.convert__controls}>
            <CustomButton
              text="Convert"
              onClick={() => dispatch(fetchConvert())}
            />

            <span onClick={toggleShowModal}>Convertations History</span>
          </div>
        </div>
      </div>
      <Modal
        className={styles.convert__modal}
        visible={showHistory}
        onClosePopup={toggleShowModal}
      >
        <h2>History</h2>
        <ul>
          {history?.map((item, index) => {
            const data = JSON.parse(item);

            return (
              <li
                key={index}
                onClick={() => {
                  {
                    toggleShowModal();
                    fetchConvert(data);
                  }
                }}
              >
                {data.amount} {data.from} to {data.to}
              </li>
            );
          })}
        </ul>
      </Modal>
    </>
  );
}

export default Main;
