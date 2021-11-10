import { useQRCode } from 'react-qrcodes';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Button, Text } from '../../../../components/Base';
import {
  formatWithEightDecimals,
  formatWithSixDecimals,
} from '../../../../utils';
import React, { useCallback } from 'react';
import { useStores } from '../../../../stores';
import { Countdown } from '../../../../components/Countdown';

interface Props {
  issueId: string;
}

export const IssueDepositModalContent: React.FC<Props> = ({ issueId }) => {
  const { issueStore, issuePageStore } = useStores();
  const issueInfo = issueStore.getIssueInfo(issueId);

  const qrData = `bitcoin:${issueInfo.bitcoinAddress}?amount=${issueInfo.sendAmount}`;
  const [qrRef] = useQRCode({
    text: qrData,
    options: {
      level: 'H',
      margin: 5,
      scale: 8,
      width: 128,
      color: {
        dark: '#000000',
        light: '#ffffffff',
      },
    },
  });

  const handleCancelIssue = useCallback(() => {
    issuePageStore.cancelIssue(issueId);
  }, [issueId, issuePageStore]);

  return useObserver(() => (
    <Box gap="small" align="center">
      <Box align="center">
        <Text inline>Send</Text>
        <Text inline color="Orange500">
          {formatWithEightDecimals(issueInfo.sendAmount)} BTC
        </Text>
        <Text color="#748695" size="small" inline>
          ≈ ${formatWithSixDecimals(issueInfo.sendUsdAmount)}
        </Text>
      </Box>
      <Box align="center" gap="xxsmall">
        <Text>in a single transaction to</Text>
        <Box round="xxsmall" style={{ padding: '16px' }} border="all">
          <Text
            bold
            style={{ textAlign: 'center', overflowWrap: 'break-word' }}
          >
            {issueInfo.bitcoinAddress}
          </Text>
        </Box>
        {!issueInfo.isExpired && (
          <Text align="center">
            Remaining time: <Countdown endTimestamp={issueInfo.expiredTime} />
          </Text>
        )}
      </Box>

      <Box>
        <canvas ref={qrRef} />
      </Box>

      <Box alignSelf="start" margin={{ bottom: 'small' }}>
        <Text>
          <Text inline bold color="Red">
            Note:
          </Text>{' '}
          If you have already made the payment, please wait for a few minutes
          for it to be confirmed.
        </Text>
      </Box>

      {issueInfo.isExpired && !issueInfo.isCanceled && (
        <Button onClick={handleCancelIssue}>Cancel Issue</Button>
      )}
    </Box>
  ));
};
