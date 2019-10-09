require 'rails_helper'

describe MessagesController do
  # テスト中に使用するインスタンスを定義
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  # indexテスト
  describe '#index' do

    # ログイン状態のテスト
    context 'log in' do
      # beforeブロックにログインしている状態を作り出し、以降の処理で毎回実行される
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      # アクション内で定義されているインスタンス変数があるか
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      # 該当するビューが描画されているか
      it 'renders index' do
        expect(response).to render_template :index
      end
    end

    # ログインしていない状態のテスト
    context 'not log in' do
      # beforeブロックにログインしていない状態を作り出し、以降の処理で毎回実行される
      before do
        get :index, params: { group_id: group.id }
      end

      # 意図したビューにリダイレクトできているか
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end

  end

  # createテスト
  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    # ログイン状態
    context 'log in' do
      before do
        login user
      end

      # メッセージの保存が成功した場合
      context 'can save' do
        subject {
          post :create,
          params: params
        }

        # 保存に成功した場合、レコードの総数が1つ増えたかを確かめる
        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        # 意図したビューにリダイレクトできているか
        it 'redirects to group_message_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      # メッセージの保存が失敗した場合
      context 'can not save' do
        # 意図的にメッセージの保存が失敗する場合を再現する
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) }}

        subject {
          post :create,
          params: invalid_params
        }

        # 保存に失敗した場合、レコードの総数が変化しないことを確かめる
        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        # 意図したビューにリダイレクトできているか
        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end

    end

    # ログインしていない状態
    context 'not log in' do

      # 意図したビューにリダイレクトできているか
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end

    end

  end
end