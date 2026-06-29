import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { useWallet } from '../contexts/WalletContext';

jest.mock('../contexts/WalletContext', () => ({
  useWallet: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

const mockUseWallet = useWallet as jest.Mock;

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  } as any;

  const walletState = {
    connectWallet: jest.fn(),
    disconnectWallet: jest.fn(),
    error: null,
    lastDeepLinkUrl: null,
    pairingUri: null,
    publicKey: null,
    reopenWallet: jest.fn(),
    status: 'idle',
    walletName: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWallet.mockReturnValue(walletState);
  });

  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(<HomeScreen navigation={mockNavigation} />);
    expect(getByText('AidNexus')).toBeTruthy();
    expect(getByLabelText('Powered by Stellar')).toBeTruthy();
    expect(getByText('Transparent aid, directly delivered.')).toBeTruthy();
    expect(getByText('Connect Wallet')).toBeTruthy();
    expect(getByText('Check Backend Health')).toBeTruthy();
    expect(getByText('Operator Task List')).toBeTruthy();
    expect(getByText('Submission Queue')).toBeTruthy();
    expect(getByText('View Aid Details')).toBeTruthy();
    expect(getByText('NGO Bulk Scan Mode')).toBeTruthy();
    expect(getByText(/Stellar network and Soroban smart contracts/)).toBeTruthy();
  });

  it('starts the wallet connection flow when connect wallet is pressed', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);

    fireEvent.press(getByText('Connect Wallet'));

    expect(walletState.connectWallet).toHaveBeenCalledTimes(1);
  });

  it('renders the connected public key when a wallet session exists', () => {
    mockUseWallet.mockReturnValue({
      ...walletState,
      publicKey: 'GABCD1234567890ABCDEFGH1234567890ABCDEFGH1234567890ABCDE',
      status: 'connected',
      walletName: 'Freighter',
    });

    const { getByText, getByLabelText } = render(<HomeScreen navigation={mockNavigation} />);

    expect(getByText('Disconnect Wallet')).toBeTruthy();
    expect(getByLabelText(/Connected public key/)).toBeTruthy();
    expect(getByLabelText(/Freighter/)).toBeTruthy();
  });

  it('navigates to Health Screen when primary button is pressed', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    const button = getByText('Check Backend Health');

    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Health');
  });

  it('navigates to Operator Task List screen', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    const button = getByText('Operator Task List');

    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('TaskList');
  });

  it('navigates to Submission Queue screen', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    const button = getByText('Submission Queue');

    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SubmissionQueue');
  });

  it('navigates to Aid Details screen', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    const button = getByText('View Aid Details');

    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AidDetails', { aidId: '1' });
  });

  it('navigates to NGO Bulk Scan screen', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    const button = getByText('NGO Bulk Scan Mode');

    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('BulkScanner');
  });

  it('navigates to Scanner screen when FAB is pressed', () => {
    const { getByLabelText } = render(<HomeScreen navigation={mockNavigation} />);
    const button = getByLabelText('Scan QR Code');

    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Scanner');
  });
});
