import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import CurrencySelector from '../../components/CurrencySelector/CurrencySelector';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import Modal from '../../components/ModalLayout';
import SwapButton from '../../components/SwapButton/SwapButton';
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
      ? localStorage.getItem('convertHistory')?.split('|').reverse()
      : [];

    setHistory(historyArray);
    console.log(historyArray);
  };

  useEffect(() => {
    getHistory();
    window.addEventListener('storage', getHistory);
    return () => window.removeEventListener('storage', getHistory);
  }, []);

  return (
    <>
      <div className={styles.convert}>
        <div className={styles.convert__funcBlock}>
          <CustomInput
            value={amount}
            onChange={(v: number) => dispatch(setAmount(v))}
            symbol={fromCurrency.symbol}
            label="Amount"
          />
          <CurrencySelector
            label="From"
            value={fromCurrency}
            onChangeValue={(v: ICurrency) => {
              dispatch(setFromCurrency(v));
            }}
          />
          <SwapButton onClick={() => dispatch(swapCurrency())} />
          <CurrencySelector
            label="To"
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

            <span onClick={toggleShowModal}>Convert History</span>
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
            console.log(data);
            return (
              <li key={index}>
                {moment(data.date).format('MMMM Do YYYY, h:mm:ss a')} -{' '}
                {data.amount} {data.fromCurrency.code} To {data.toCurrency.code}{' '}
                {data.result}
              </li>
            );
          })}
        </ul>
      </Modal>
    </>
  );
}

export default Main;
