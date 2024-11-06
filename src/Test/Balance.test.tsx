import {updateWallet } from "../Utils";

describe("updateWallet", () => {
    let setBalance: jest.Mock;
    let currentBalance: number;
    let betAmount: number;
  
    beforeEach(() => {
      setBalance = jest.fn();
      currentBalance = 100; 
      betAmount = 20;       
    });
  
    it("should increase balance by bet amount on win without Blackjack", () => {
      updateWallet("win", false, currentBalance, betAmount, setBalance);
  

      expect(setBalance).toHaveBeenCalledWith(currentBalance + betAmount);
    });
  
    it("should increase balance by 2.5 times bet amount on win with Blackjack", () => {
      updateWallet("win", true, currentBalance, betAmount, setBalance);
      expect(setBalance).toHaveBeenCalledWith(currentBalance + betAmount * 2.5);
    });
  
    it("should decrease balance by bet amount on loss", () => {
      updateWallet("lose", false, currentBalance, betAmount, setBalance);
  
      expect(setBalance).toHaveBeenCalledWith(currentBalance - betAmount);
    });
  
    it("should not change balance on draw", () => {
      updateWallet("draw", false, currentBalance, betAmount, setBalance);
  
      expect(setBalance).toHaveBeenCalledWith(currentBalance);
    });
  });
  