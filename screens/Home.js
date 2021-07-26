import React from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { MainLayout } from "./";
import { getCoinMarket, getHoldings } from "../stores/market/marketActions";
import { SIZES, COLORS, FONTS, dummyData, icons } from "../constants";
import { BalanceInfo, Chart, IconTextButton } from "../components";

const Home = () => {
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getHoldings((holdings = dummyData.holdings)));
      dispatch(getCoinMarket());
    }, [])
  );

  const myHoldings = useSelector((state) => state.marketReducer.myHoldings);
  const coins = useSelector((state) => state.marketReducer.coins);

  let TotalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (TotalWallet - valueChange)) * 100;

  const renderWalletInfoSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/* Balance Info */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={TotalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: 50,
          }}
        />

        {/* Buttons */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            onPress={() => console.log("Transfer button pressed")}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            onPress={() => console.log("Withdraw button pressed")}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header Section - Wallet Info */}
        {renderWalletInfoSection()}
        {/* Chart Section */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={coins[0]?.sparkline_in_7d?.price}
        />
        {/* Footer Section - Top CryptoCurrency */}
      </View>
    </MainLayout>
  );
};

export default Home;
