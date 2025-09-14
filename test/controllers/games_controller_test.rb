require "test_helper"

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    skip "テストを一時スキップ"
    get games_path
    assert_response :success
  end

  test "should create game" do
    skip "テストを一時スキップ"
    post games_path, params: { game: { name: "Test" } }
    assert_response :redirect
  end
end
