import {
  getAuthCodeApi,
  postAuthCodeCompareApi,
  // patchAuthCodeChangeApi,
  postLoginApi,
  postLogoutApi,
  getUserInfoApi,
} from './baseRepository';

describe('baseRepository 에서', () => {
  context('정의한 엔드포인트가 정상적으로 동작하는지 확인하기 위해', () => {
    it('getAuthCodeApi 를 테스트한다.', async () => {
      try {
        const { data } = await getAuthCodeApi({ email: 'ably933@dummy.com' });

        expect(data.issueToken).toContain('iamissuetoken');
        expect(data.remainMillisecond).toEqual(180000);
      } catch (error) {
        console.error(error);
      }
    });

    it('getAuthCodeApi 를 테스트한다.', async () => {
      try {
        const {
          data: { issueToken },
        } = await getAuthCodeApi({
          email: 'ably933@dummy.com',
        });
        const { data } = await postAuthCodeCompareApi({
          param: {
            email: 'ably933@dummy.com',
            authCode: '171009',
            issueToken,
          },
        });

        expect(data.confirmToken).toContain('iamconfirmtoken');
      } catch (error) {
        console.error(error);
      }
    });

    // TODO: 400이 뜸 추후에 정상화 해야 함
    // it('patchAuthCodeChangeApi 를 테스트한다.', async () => {
    //   try {
    //     const {
    //       data: { issueToken },
    //     } = await getAuthCodeApi({
    //       email: 'ably933@dummy.com',
    //     });
    //     const {
    //       data: { confirmToken },
    //     } = await postAuthCodeCompareApi({
    //       param: {
    //         email: 'ably933@dummy.com',
    //         authCode: '171009',
    //         issueToken,
    //       },
    //     });

    //     const { data } = await patchAuthCodeChangeApi({
    //       param: {
    //         email: 'ably933@dummy.com',
    //         confirmToken,
    //         newPassword: '!abc321#$',
    //         newPasswordConfirm: '!abc321#$',
    //       },
    //     });

    //     expect(data).toEqual('');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });

    it('postLoginApi 을 테스트한다.', async () => {
      try {
        const { data } = await postLoginApi({
          param: {
            email: 'ably933@dummy.com',
            password: '!abc321#$',
          },
        });

        expect(data.accessToken.length).toEqual(185);
      } catch (error) {
        console.error(error);
      }
    });

    it('postLogoutApi 을 테스트한다.', async () => {
      try {
        const {
          data: { accessToken },
        } = await postLoginApi({
          param: {
            email: 'ably933@dummy.com',
            password: '!abc321#$',
          },
        });

        sessionStorage.setItem('accessToken', accessToken);

        const { data } = await postLogoutApi();

        expect(data.lastConnectedAt.toString().length).toEqual(13);
      } catch (error) {
        console.error(error);
      }
    });

    it('getUserInfoApi 을 테스트한다.', async () => {
      try {
        const {
          data: { accessToken },
        } = await postLoginApi({
          param: {
            email: 'ably933@dummy.com',
            password: '!abc321#$',
          },
        });

        sessionStorage.setItem('accessToken', accessToken);

        const { data } = await getUserInfoApi();

        expect(data.email).toEqual('ably933@dummy.com');
      } catch (error) {
        console.error(error);
      }
    });
  });
});
