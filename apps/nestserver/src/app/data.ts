export const applications = {
  applications: [
    {
      applicationId: 'EFC12345678',
      userName: 'Paweł Dudek',
      companyName: 'Kwarantanna sp. z o.o',
      applicationDateRequested: '2019-12-01 00:00:00',
      applicationStatus: 'GRANTED_CHANGED',
      amountRequested: '200000',
      amountGranted: '100000',
      contractId: 'document_id_1',
      decisionId: 'decision_id_1',
      errorsPFR: 'to jest blad',
      parentApplicationId: '',
      isClaimAllowed: true,
      nrNip: '9531542419'
    },

    {
      applicationId: 'EFC12345679',
      userName: 'Paweł Dudek',
      companyName: 'Kwarantanna sp. z o.o',
      applicationDateRequested: '2020-02-01 00:00:00',
      applicationStatus: 'SEND',
      amountRequested: '200000',
      amountGranted: '100000',
      contractId: 'document_id_1',
      decisionId: 'decision_id_1',
      errorsPFR: 'to jest blad',
      parentApplicationId: 'EFC12345678',
      isClaimAllowed: false,
      nrNip: '9531542419'
    },
    {
      applicationId: 'EFC12345680',
      userName: 'Paweł Dudek',
      companyName: 'Kwarantanna sp. z o.o',
      applicationDateRequested: '2020-03-01 00:00:00',
      applicationStatus: 'SEND',
      amountRequested: '200000',
      amountGranted: '100000',
      contractId: 'document_id_1',
      decisionId: 'decision_id_1',
      errorsPFR: 'to jest blad',
      parentApplicationId: 'EFC12345678',
      isClaimAllowed: false,
      nrNip: '9531542419'
    },
    {
      applicationId: 'EFC12345681',
      userName: 'Wojciech Kowalski',
      companyName: 'Apteka s.c.',
      applicationDateRequested: '2020-01-01',
      applicationStatus: 'REJECTED_BAD_DATA',
      amountRequested: '50000',
      contractId: 'document_id_1',
      decisionId: 'decision_id_1',
      errorsPFR: 'to jest blad',
      parentApplicationId: '',
      isClaimAllowed: false,
      nrNip: '9531542419'
    },
    {
      applicationId: 'EFC12345999',
      userName: 'Wojciech Kowalski',
      companyName: 'Apteka s.c.',
      applicationDateRequested: '2020-01-01',
      applicationStatus: 'REJECTED_BAD_DATA',
      amountRequested: '50000',
      contractId: 'document_id_1',
      decisionId: 'decision_id_1',
      errorsPFR: 'to jest blad',
      parentApplicationId: 'EFC12345681',
      isClaimAllowed: false,
      nrNip: '9531542419'
    },
    {
      applicationId: 'EFC12345682',
      userName: 'TOmasz Nowak',
      companyName: 'Piekarnia Kamień',
      applicationDateRequested: '2019-02-01',
      applicationStatus: 'GRANTED_CHANGED',
      amountRequested: '100000',
      amountGranted: '8000',
      contractId: 'document_id_1',
      decisionId: 'decision_id_1',
      errorsPFR: 'to jest blad',
      parentApplicationId: '',
      isClaimAllowed: true,
      nrNip: '9531542419'
    }
  ]
};
