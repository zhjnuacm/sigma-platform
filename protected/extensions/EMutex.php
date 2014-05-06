<?php

class EMutex extends CApplicationComponent
{
	
	public $mutexFile;
	
	private $_locks = array();
	
	public function init()
	{
		
		parent::init();
		
		if (null === $this->mutexFile)
		{
			$this->mutexFile = Yii::app()->getRuntimePath() . '/mutex.bin';
		}
		
	}
	
	public function lock($id, $timeout = 0)
	{
		
		$lockFileHandle = $this->_getLockFileHandle($id);
		
		if (flock($lockFileHandle, LOCK_EX))
		{
			
			$data = @unserialize(@file_get_contents($this->mutexFile));

			if (empty($data))
			{
				$data = array();
			}

			if (!isset($data[$id]) || ($data[$id][0] > 0 && $data[$id][0] + $data[$id][1] <= microtime(true)))
			{
				
				$data[$id] = array($timeout, microtime(true));
				
				array_push($this->_locks, $id);
				
				$result = (bool)file_put_contents($this->mutexFile, serialize($data));
				
			}
			
		}
		
		fclose($lockFileHandle);
		
		@unlink($this->_getLockFile($id));
		
		return isset($result) ? $result : false;
		
	}
	
	public function unlock($id = null)
	{
		
		if (null === $id && null === ($id = array_pop($this->_locks)))
		{
			throw new CException("No lock available that could be released. Make sure to setup a lock first.");
		}
		elseif (in_array($id, $this->_locks))
		{
			throw new CException("Don't define the id for a local lock. Only do it for locks that weren't created within the current request.");
		}
		
		$lockFileHandle = $this->_getLockFileHandle($id);
		
		if (flock($lockFileHandle, LOCK_EX))
		{
			
			$data = @unserialize(@file_get_contents($this->mutexFile));

			if (!empty($data) && isset($data[$id]))
			{
				
				unset($data[$id]);
				
				$result = (bool)file_put_contents($this->mutexFile, serialize($data));
				
			}
			
		}
		
		fclose($lockFileHandle);
		
		@unlink($this->_getLockFile($id));
		
		return isset($result) ? $result : false;
		
	}
	
	private function _getLockFile($id)
	{
		return "{$this->mutexFile}." . md5($id) . '.lock';
	}
	
	private function _getLockFileHandle($id)
	{
		return fopen($this->_getLockFile($id), 'a+b');
	}
	
	/* Verify wheter a lock exists or not.
	 *
	* @param mixed $id The optional lock id to verify
	* @return boolean If the locks exists
	*/
	public function lockExists($id = null) {
		if($id === null)
			if(count($this->_locks) == 0)
			return false;
		else
			return true;
		else
			if(in_array($id, $this->_locks))
			return true;
		else
			return false;
	}
}

?>