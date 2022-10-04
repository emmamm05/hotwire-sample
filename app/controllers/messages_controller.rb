class MessagesController < ApplicationController
  skip_forgery_protection

  before_action :set_message, only: %i[destroy]

  def index
    @messages = Message.all.order(created_at: :desc)
  end

  def create
    @message = Message.create!(body: params[:body])
    broadcast.prepend

    respond_to do |format|
      format.turbo_stream
    end
  end

  def destroy
    @message.destroy!
    broadcast.remove

    respond_to do |format|
      format.turbo_stream
    end
  end

  private

  def broadcast
    @broadcast ||= Broadcast::Strategies::Simple.new(
      @message,
      ::Messages::Message::Component
    )
  end

  def set_message
    @message = Message.find(params[:id])
  end

  def message_params
    params.fetch(:message, {})
  end
end
