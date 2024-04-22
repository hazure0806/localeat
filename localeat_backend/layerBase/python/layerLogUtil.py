import logging

# ロガーの設定
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# ハンドラーの設定（コンソール出力）
stream_handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

def log_info(message):
    """
    INFOレベルのログを出力する関数
    """
    logger.info(message)

def log_error(message):
    """
    ERRORレベルのログを出力する関数
    """
    logger.error(message)

def log_debug(message):
    """
    DEBUGレベルのログを出力する関数
    """
    logger.debug(message)

def log_warning(message):
    """
    WARNINGレベルのログを出力する関数
    """
    logger.warning(message)

def log_critical(message):
    """
    CRITICALレベルのログを出力する関数
    """
    logger.critical(message)
