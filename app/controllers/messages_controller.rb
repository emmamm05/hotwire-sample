class MessagesController < ApplicationController
  skip_forgery_protection

  before_action :set_message, only: %i[destroy]

  def index
    @messages = Message.all.order(created_at: :desc)
  end

  def create
    @message = Message.create!(body: params[:body])

    Broadcast::Message.new(@message).prepend

    respond_to do |format|
      format.turbo_stream
    end
  end

  def destroy
    @message.destroy!

    Broadcast::Message.new(@message).remove

    respond_to do |format|
      format.turbo_stream
    end
  end

  private

  def set_message
    @message = Message.find(params[:id])
  end

  def message_params
    params.fetch(:message, {})
  end
end
