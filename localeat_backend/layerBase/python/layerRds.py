import datetime
import os
import pymysql
import boto3
from botocore.exceptions import ClientError
import json
from layerLogUtil import log_info, log_error

def get_secret():

    secret_name = "layerParams"
    region_name = "ap-northeast-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name="secretsmanager", region_name=region_name)

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    secret = get_secret_value_response["SecretString"]

    return secret


def get_db_config():
    # Function to get database configuration from secret
    secret_string = get_secret()  # 秘密情報の文字列を取得
    secret = json.loads(secret_string)  # JSON形式の文字列を辞書に変換

    return {
        "user": secret["DB_USER"],
        "password": secret["DB_PASSWORD"],
        "host": secret["DB_HOST"],
        "database": "yaminabe_search",
    }


def connect_to_database():
    # Connect to the database
    return pymysql.connect(**get_db_config())


# Select文の結果件数を取得する
def execute_select_count_query(sql):
    try:
        connection = connect_to_database()
        with connection.cursor() as cursor:
            cursor.execute(sql)
            result = cursor.fetchone()[0]
            return {"count": result}
    except Exception as e:
        return {"error": str(e)}
    finally:
        if "connection" in locals() and connection is not None:
            connection.close()


# Select文の結果を取得する
def execute_select_query(sql):
    connection = None
    try:
        connection = connect_to_database()
        with connection.cursor() as cursor:
            log_info(f"Executing SQL query: {sql}")
            cursor.execute(sql)
            columns = [col[0] for col in cursor.description]
            rows = cursor.fetchall()
            result = [
                {
                    col: (
                        str(value)
                        if isinstance(value, (datetime.date, datetime.datetime))
                        else value
                    )
                    for col, value in zip(columns, row)
                }
                for row in rows
            ]
            return {"rows": result}
    except pymysql.err.ProgrammingError as e:
        # SQL文のエラーをキャッチ
        return {"error": f"SQL query error: {str(e)}"}
    except pymysql.err.InternalError as e:
        # データベース内部のエラーをキャッチ
        return {"error": f"Database internal error: {str(e)}"}
    except Exception as e:
        # その他のエラーをキャッチ
        return {"error": f"Unexpected error: {str(e)}"}
    finally:
        if connection:
            connection.close()


def execute_other_query(sql):
    try:
        connection = connect_to_database()
        with connection.cursor() as cursor:
            cursor.execute(sql)
            connection.commit()
            return {"success": True}
    except Exception as e:
        return {"error": str(e)}
    finally:
        if "connection" in locals() and connection is not None:
            connection.close()
